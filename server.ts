import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Route for the contact form
  app.post('/api/contact', async (req, res) => {
    const { name, branche, telefon } = req.body;

    if (!name || !branche || !telefon) {
      return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
    }

    try {
      // Check if SMTP credentials are provided
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('⚠️ SMTP-Zugangsdaten fehlen. Die E-Mail wird nur in der Konsole simuliert.');
        console.log('--- NEUE BERATUNGSANFRAGE ---');
        console.log(`Name: ${name}`);
        console.log(`Branche: ${branche}`);
        console.log(`Telefon: ${telefon}`);
        console.log('-----------------------------');
        
        // Return success for the preview environment even if not configured yet
        return res.json({ 
          success: true, 
          message: 'Simuliert: Anfrage erfolgreich gesendet (SMTP nicht konfiguriert).' 
        });
      }

      // Configure the email transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send the email
      await transporter.sendMail({
        from: `"Valasis Digital Website" <${process.env.SMTP_USER}>`,
        to: 'hallo@valasis-digital.de', // The destination email address
        subject: `Neue Beratungsanfrage: ${name}`,
        text: `Hallo Valasis Digital-Team,\n\nEs gibt eine neue Beratungsanfrage über die Website:\n\nName / Unternehmen: ${name}\nBranche: ${branche}\nTelefonnummer: ${telefon}\n\nViele Grüße,\nIhr Website-System`,
        html: `
          <h3>Neue Beratungsanfrage</h3>
          <p>Es gibt eine neue Beratungsanfrage über die Website:</p>
          <ul>
            <li><strong>Name / Unternehmen:</strong> ${name}</li>
            <li><strong>Branche:</strong> ${branche}</li>
            <li><strong>Telefonnummer:</strong> ${telefon}</li>
          </ul>
          <p>Viele Grüße,<br>Ihr Website-System</p>
        `
      });

      res.json({ success: true, message: 'Ihre Anfrage wurde erfolgreich gesendet!' });
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail:', error);
      res.status(500).json({ error: 'Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es später erneut.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the static files from the dist folder
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
