module.exports = () => {

    return (req,res,next) => {

        if(!req.isAuthenticated()) return res.redirect('/backend');

        next();
    }
}