var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

exports.sendMail = function(request, response) {
    var mailFrom = "dattatray.gade@gmail.com";
    var subject = "Invoice from Shubham Enterprise";
    var content = "Sample mail content from Shubham Enterprise";

    if (request.body.data) {
        try {
            var reqJsonString = request.body.data;
            var mailTo = reqJsonString.mail_to;

            if (mailTo == "" || mailTo == null || mailTo == undefined) {
                response.send(invalidData);
                return;
            }
        } catch (error) {
            var errMessage = error.message;
            response.send(error);
            return;
        }
    }

    var smtpTransport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailFrom,
            pass: "Vighu@4213"
        }
    });

    var mailerOptions = {
        from: mailFrom,
        to: mailTo,
        subject: subject,
        text: content,
        html: "<b>Shubham Enterprises</b>",
        attachments: [{ path: '/Users/datta/Desktop/Invoice.pdf' }]
    }

    smtpTransport.sendMail(mailerOptions, function(error, res) {
        if (error) {
            console.log("error is ..:", error);
        } else {
            console.log("Message sent: " + JSON.parse(res));
            var result = '{"status":200' + ',' + '"message" :"Mail sent successfully."' + '}';
            response.send(result);
        }

        smtpTransport.close();
    });
}