# Portfolio Deployment Guide

## Fixed Issues

### 1. Certificate Images Fixed
- **Problem**: Images pointing to PDF files instead of PNG images
- **Solution**: Updated all certificate paths to use `/images/Certifications/` structure
- **Result**: All certificates now display correctly

### 2. Contact Form Fixed for Vercel
- **Problem**: Server not compatible with Vercel deployment
- **Solution**: Added Vercel configuration and server export
- **Result**: Contact form works on Vercel deployment

## Folder Structure

```
public/
  images/
    Certifications/
      AWS Academy Cloud Foundations/
        AWS Academy Graduate - Cloud Foundations - Training Badge/
          Screenshot 2026-01-28 015207.png
        Exam Prep - AWS Certified Cloud Practitioner Foundations/
          Screenshot 2026-01-28 015627.png
      Docker Certified Associate/
        Screenshot 2026-01-28 015353.png
      Google Cloud Fundamentals - Core Infrastructure/
        Screenshot 2026-01-28 015330.png
      Linux for Cloud and DevOps Engineers/
        Screenshot 2026-01-28 015307.png
```

## Vercel Environment Variables

Set these in Vercel Dashboard:

1. **EMAIL_USER**
   - Value: `chaitanyagote5006@gmail.com`
   - Type: Plain Text

2. **EMAIL_PASS**
   - Value: `your-16-character-gmail-app-password`
   - Type: Plain Text

3. **NODE_ENV**
   - Value: `production`
   - Type: Plain Text

## Deployment Steps

### 1. Set Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the three variables above

### 2. Deploy
```bash
git add .
git commit -m "Fix certificate images and Vercel deployment"
git push origin main
vercel --prod
```

### 3. Test
1. Visit: https://chaitanya-cloud-devops-portfolio.vercel.app
2. Check certificate images display
3. Test contact form submission

## Gmail App Password Setup

1. Enable 2FA on Gmail
2. Go to Gmail Settings > Security
3. Click "App Passwords"
4. Select "Mail" > "Other (Custom name)"
5. Copy 16-character password
6. Use this as EMAIL_PASS

## Troubleshooting

### Certificate Images Not Showing
- Check file paths in HTML
- Verify images exist in `/public/images/Certifications/`
- Check case sensitivity (Linux is case-sensitive)

### Contact Form Not Working
- Verify environment variables in Vercel
- Check Gmail app password is correct
- Check server logs in Vercel dashboard

### HTTP 500 Errors
- Check Vercel function logs
- Verify EMAIL_USER and EMAIL_PASS are set
- Check Gmail authentication
