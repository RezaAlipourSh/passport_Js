class Error {

    static notFoundError(req, res, next) {
        res.send({
            status: 404,
            message: "notFound"
        })
    }

    static errorHandel(err, req, res, next) {
        // let dupkey = null;
        // if (err.message.includes("dup key")) {
        //     dupkey = " duplicate username ,try diffrent value"
        // } dupkey ??
        res.send({
            status: err?.status ?? err?.statusCode ?? 500,
            message: err?.message ?? "ServerERROR"
        })
    }
}

module.exports = Error
