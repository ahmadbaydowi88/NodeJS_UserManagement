const Customer = require('../model/Customer');
const mongoose = require('mongoose');

// Get 
// HomePage

exports.homepage = async (req, res) => {

    const msg = await req.flash('msg');

    const locals = {
        title: "NodeJS",
        description: "NodeJS User Management System",
    }

    let perPage = 12;
    let page = req.query.page || 1;
    
    try {
        const customers = await Customer.aggregate([ { $sort: { updatedAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await Customer.countDocuments({});
        
        res.render('index.ejs',{ 
            locals, 
            customers,
            current: count,
            pages: Math.ceil(count / perPage),
            msg, 
        });

    } catch (error) {
        console.log(error);
    }
}
// exports.homepage = async (req, res) => {

//     const msg = await req.flash('msg');

//     const locals = {
//         title: "NodeJS",
//         description: "NodeJS User Management System",
//     }

    
//     try {
//         const customers = await Customer.find({}).limit(22);
//         res.render('index.ejs',{ locals, msg, customers });

//     } catch (error) {
//         consol.log(error);
//     }
// }


// Get 
// add Customers


exports.addCustomer = async (req, res) => {

    const locals = {
        title: "Add New Customer - NodeJS",
        description: "NodeJS User Management System",
    }

    res.render('customer/add',locals);
}

// POSH 
// Create New Customers Form


exports.postCustomer = async (req, res) => {

    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        email: req.body.email,
        details: req.body.details,
    });

    try {
        await Customer.create(newCustomer);
        await req.flash('msg', 'New Customer has been Added.');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}