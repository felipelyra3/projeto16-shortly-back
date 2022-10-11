function ComparePasswordAndConfirmPassowrd(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
        res.status(422).send('password and confirmPassword must be the same');
        return;
    }

    next();
}

export default ComparePasswordAndConfirmPassowrd;