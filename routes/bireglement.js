const express = require("express") 
const router=express.Router()
const facturation = require("../models/Facturation")
const Commande = require("../models/Commande")
const nodemailer=require('nodemailer')
const cmdfacturer= require("../models/cmdfacturer")
const Accounts = require("../models/Accounts")
        
async function getusers(){
  const date = new Date();
  const yearnow= date.getFullYear()
  const yearsnow =yearnow.toString()
  const monthnow=   ("0" + (date.getMonth() + 1)).slice(-2).toString();
    const prix = await cmdfacturer.aggregate([{
    
        $match: {year:yearsnow}},
    {
    $group: {
      _id: "$month",
      count: { $sum: "$PrixTOT" }
    }
  },
  { $sort : {month: -1 } }
])
  console.log('revenue par mois de dernier annees',prix)

  const prixannée = await cmdfacturer.aggregate([{
 

$group: {
  _id: "$year",
  count: { $sum: "$PrixTOT" }
 
},

},
{ $sort : { year : 1 } }

])
console.log('revenue par année',prixannée)  
const facturesnonréglerparmodepaiement = await facturation.aggregate([
  { 
    $match: {
         $and: [ 
             {acquit: 'oui'}, 
             {etat:'valide'}, 
          
         ]
    }}
 ,
    
 
  { $group: { 
    
     _id: {
      mode: "$Codeclient",
     etat: '$Modepaiement',
    },
   myCount: { $sum: 1 } } },

])
console.log('factures non régler',facturesnonréglerparmodepaiement)  
const facturemode = await cmdfacturer.aggregate([
  {
   $match: {year:yearsnow}},
  
    
     { $group: {  _id: "$Modepaiement",
     
       myCount: { $sum: 1 } } },
   
   ])
console.log('facturesmode',facturemode)  

    }
    getusers()
    router.get(
      "/revenumois",  async (req, res) => {
        const date = new Date();
        const yearnow= date.getFullYear()
        const yearsnow =yearnow.toString()
        const prix = await cmdfacturer.aggregate([{
    
          $match: {year:yearsnow}},
      {
      $group: {
        _id: "$month",
        count: { $sum: "$PrixTOT" }
      }},
   
   
    ])
        
    res.send(prix);
    })
    router.get(
      "/prixannee",  async (req, res) => {
        const prixannée = await cmdfacturer.aggregate([{
     
    
          $group: {
            _id: "$year",
            count: { $sum: "$PrixTOT" }
           
          },
          
          },
         
          
          ])
        
    res.send(prixannée);
    })
    router.get(
      "/nonregler",  async (req, res) => {
        const facturesnonréglerparmodepaiement = await facturation.aggregate([
          {  $match: {acquit:'oui'}},
            
         
          { $group: {  _id: {
            mode: "$Modepaiement",
           etat: '$etat',
          },  myCount: { $sum: 1 } } },
        
        ])
        
    res.send(facturesnonréglerparmodepaiement);
    })
    router.get(
      "/facturemode",  async (req, res) => {
        const date = new Date();
        const yearnow= date.getFullYear()
        const yearsnow =yearnow.toString()
    
       const facturemode = await cmdfacturer.aggregate([
       {
        $match: {year:yearsnow}},
       
         
          { $group: {  _id: "$Modepaiement",
          
            myCount: { $sum: 1 } } },
        
        ])
    res.send(facturemode);
    })
    module.exports=router;