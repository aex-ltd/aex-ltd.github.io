<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Response</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .message {
            font-size: 18px;
            margin-bottom: 20px;
        }
        .button {
            padding: 10px 20px;
            background-color: #1B5191;
            color: black;
            text-decoration: none;
            border-radius: 5px;
            font-weight:bold;        }
        .button:hover {
            background-color: #164371;
        }
    </style>
</head>
<body>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Retrieve form data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $message = $_POST['message'];

        // Recipient email address
        $to = "info@aex-nigeria.com";

        // Subject of the email
        $subject = "New Message $email";

        // Message body
        $body = "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Phone: $phone\n";
        $body .= "Message: \n$message\n";

        // Email headers
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $to\r\n";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo '<div class="message">Message sent successfully!</div>';
        } else {
            echo '<div class="message">Failed to send message.</div>';
        }
    } else {
        echo '<div class="message">Invalid request method.</div>';
    }
    ?>
    <a href="http://aex-nigeria.com" class="button">Go Home</a>
</body>
</html>
