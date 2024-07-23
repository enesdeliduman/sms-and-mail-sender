const resetPassword = (username, code) => {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Şifre Sıfırlama İsteği</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        background-color: #4d4d4d;
                        color: #ffffff;
                        text-align: center;
                        padding: 20px 0;
                    }
                    .header h1 {
                        font-size: 24px;
                        margin: 0;
                    }
                    .content {
                        padding: 30px;
                    }
                    .content p {
                        font-size: 16px;
                        margin-bottom: 20px;
                        color: #333333;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #4d4d4d;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background-color 0.3s ease;
                    }
                    .button:hover {
                        background-color: #333333;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        background-color: #f8f9fa;
                    }
                    .footer p {
                        font-size: 14px;
                        color: #666666;
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Şifre Sıfırlama İsteği</h1>
                    </div>
                    <div class="content">
                        <p>Merhaba ${username},</p>
                        <p>Şifrenizi sıfırlamak için aşağıdaki kodu kullanabilirsiniz:</p>
                        <p><b><a href="https://localhost:${process.env.PORT}//${code}">Lütfen şifrenizi sıfırlamak için bu bağlantıya tıklayın</a></b></p>
                        <p>Bağlantıya tıklamazsanız veya bu işlemi siz yapmadıysanız, bu mesajı dikkate almayınız.</p>
                    </div>
                    <div class="footer">
                        <p>İyi günler dileriz,<br>${process.env.SITE_NAME}</p>
                    </div>
                </div>
            </body>
            </html>`
}
module.exports = resetPassword