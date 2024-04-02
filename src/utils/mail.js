// utils/emailTemplates.js

/**
 * Generates HTML content for the password reset email.
 * @param {string} resetLink The base URL to the password reset page.
 * @param {string} token The password reset token.
 * @returns {string} The HTML content.
 */
function getPasswordResetEmailContent(resetLink, token) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        ...
        <title>Password Reset</title>
        ...
    </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h2>Password Reset Request</h2>
            </div>
            <div class="email-content">
                <p>You are receiving this email because a password reset request was made for your account. If this was you,
                    please click on the button below to reset your password:</p>
                <a href="${resetLink}${token}" class="reset-button">Reset Password</a>
                <p>If you did not request a password reset, please disregard this email. Your password will remain unchanged
                    and your account secure.</p>
            </div>
            <div class="footer">
                <p>Having trouble with the button? Copy and paste the URL below into your web browser:</p>
                <p><a href="${resetLink}${token}">${resetLink}${token}</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

module.exports = { getPasswordResetEmailContent };
