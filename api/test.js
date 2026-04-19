require('dotenv').config();

module.exports = (req, res) => {
  try {
    // Test if environment variables are loaded
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    console.log('Environment Variables Check:');
    console.log('EMAIL_USER exists:', !!emailUser);
    console.log('EMAIL_PASS exists:', !!emailPass);
    console.log('EMAIL_USER length:', emailUser ? emailUser.length : 'undefined');
    console.log('EMAIL_PASS length:', emailPass ? emailPass.length : 'undefined');
    
    res.json({
      success: true,
      message: 'Environment variables test',
      env: {
        emailUserExists: !!emailUser,
        emailPassExists: !!emailPass,
        emailUserLength: emailUser ? emailUser.length : 0,
        emailPassLength: emailPass ? emailPass.length : 0
      }
    });
  } catch (error) {
    console.error('Test function error:', error);
    res.status(500).json({
      success: false,
      message: 'Test function failed',
      error: error.message
    });
  }
};
