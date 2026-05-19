// ════════════════════════════════
// EmailJS Auto Reply
// ════════════════════════════════

const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_ept7ot2';

function sendAutoReply(data) {

    const params2 = {
        from_name: data.from_name,
        reply_to: data.reply_to,
        to_email: data.reply_to,   // IMPORTANT
        phone: data.phone,
        service: data.service,
        message: data.message,
        subject: "Thank You for Contacting Abronix Technologies"
    };

    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        params2
    )
    .then(() => {
        console.log("Auto-reply sent successfully");
})
.catch((err) => {
    console.error("Auto-reply failed:", err);
});

}