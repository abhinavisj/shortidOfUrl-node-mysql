// const { connection } = require('../models/urls');
const { connection } = require('../connection');
const shortid = require("shortid")

async function generateNewShortUrl (req, res) {
    const body = req.body
    if(!body.url) return res.status(400).json({error: "Url is require."})
    const shortID  = shortid();
    const insertQuery = `INSERT INTO urls (shortId, redirectUrl, visitHistory) VALUES (?, ?, IFNULL(JSON_ARRAY(), JSON_ARRAY()))`;
    connection.query(insertQuery, [shortID, body.url], (err, result)=>{
        if(err){
            console.log(`There are some error : ${err}`)
            res.status(500).send('Error storing data');
        }else {
            console.log("Data stored successfully.")
            connection.query('SELECT * FROM urls', (error, results, field)=>{
                if(error){
                    res.status(500).send('Error to fetching data');
                }else if(results.length>0){
                    // console.log(results, "result of table")
                    return res.render("home", {urlData: results})
                }
            })
            
            // res.status(200).json({"msg":"Data stored successfully.", id: shortID})
        }
    })
}

const redirectToUrl = async(req, res) =>{
    const shortId = req.params.shortid;
    const visitData = { date: new Date(), ip: req.body.ip };
    connection.query('SELECT redirectUrl FROM urls WHERE shortId=?', shortId, (error, result, field)=>{
        if (error) {
            res.status(500).json({ msg: "An error occurred while fetching the redirect URL", error: error });
          } 
          else if (result.length > 0) {
            connection.query('UPDATE urls SET visitHistory = JSON_ARRAY_APPEND(visitHistory, "$", ?) WHERE shortId = ?', [JSON.stringify(visitData), shortId], (updateError, updateResult) => {
                if (updateError) {
                  console.error('Error updating visit history: ', updateError);
                } else {
                  console.log('Visit history updated successfully');
                }
              });
            const redirectUrl = result[0].redirectUrl;
            res.redirect(redirectUrl);
          } else {
            res.status(404).json({ msg: "URL not found for the given shortId" });
          }
    });
}

const urlHomePage = async(req, res) =>{
    connection.query('SELECT * FROM urls', (error, results, field)=>{
        if(error){
            res.status(500).send('Error to fetching data');
        }else if(results.length>0){
            // console.log(results, "result of table")
            return res.render("home", {urlData: results})
        }
    })
}

module.exports = {
    generateNewShortUrl,
    redirectToUrl,
    urlHomePage
    }