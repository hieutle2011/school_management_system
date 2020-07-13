const { write } = require('@fast-csv/format');

function csvExport(res, next, data, filename) {
    res.setHeader('Content-disposition', 'attachment; filename=' + filename + '.csv');
    res.setHeader('Content-type', 'text/csv');
    write(data, { headers: true })
        .pipe(res)
        .on('error', function (err) {
            // capture any errors that occur when streaming to response
            console.log('File Stream:', err);
            return next(err)
        })
        .on('close', function () {
            console.log(`Finish streaming file to server.`);
        });
}

module.exports = { csvExport }