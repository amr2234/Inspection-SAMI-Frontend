// Authentication API Service
// This is a mock service - replace with actual API calls

const API_BASE_URL = '/api/auth';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock storage for OTP verification (in real app, this is backend-only)
let mockOtpStore = {};
let mockVerifiedEmails = new Set();

export const authService = {
  // Resend OTP
  async resendOtp({ email }) {
    await delay(800);
    
    if (!email) {
      throw new Error('البريد الإلكتروني مطلوب');
    }

    // Mock: Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    mockOtpStore[email] = newOtp;
    
    console.log(`[Mock] New OTP for ${email}: ${newOtp}`);
    
    return {
      success: true,
      message: 'تم إرسال رمز التحقق الجديد'
    };
  },

  // Verify email with OTP
  async verifyEmail({ email, otp }) {
    await delay(1000);
    
    if (!email || !otp) {
      throw new Error('البريد الإلكتروني ورمز التحقق مطلوبان');
    }

    if (otp.length !== 6) {
      throw new Error('رمز التحقق يجب أن يكون 6 أرقام');
    }

    // Mock verification
    // In production: Backend validates OTP
    const storedOtp = mockOtpStore[email];
    
    // For testing: Accept "123456" as universal valid OTP
    if (otp === '123456' || otp === storedOtp) {
      mockVerifiedEmails.add(email);
      delete mockOtpStore[email];
      return {
        success: true,
        message: 'تم التحقق من البريد الإلكتروني بنجاح'
      };
    }

    throw new Error('رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.');
  },

  // Set password after email verification
  async setPassword({ email, password }) {
    await delay(1000);
    
    if (!email || !password) {
      throw new Error('البريد الإلكتروني وكلمة المرور مطلوبان');
    }

    // Check if email was verified
    if (!mockVerifiedEmails.has(email)) {
      throw new Error('يجب التحقق من البريد الإلكتروني أولاً');
    }

    // Validate password
    if (password.length < 8) {
      throw new Error('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
    }

    // Mock: Store password (in real app, hash and store in database)
    console.log(`[Mock] Password set for ${email}`);
    
    // Clean up
    mockVerifiedEmails.delete(email);
    
    return {
      success: true,
      message: 'تم إنشاء كلمة المرور بنجاح'
    };
  },

  // Sign in
  async signIn({ email, password }) {
    await delay(1000);
    
    if (!email || !password) {
      throw new Error('البريد الإلكتروني وكلمة المرور مطلوبان');
    }

    // Mock authentication
    // In production: Backend validates credentials
    if (password === 'Admin@123') {
      return {
        success: true,
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'Inspector'
        }
      };
    }

    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  },

  // Helper: Initialize OTP for testing
  initTestOtp(email, otp = '123456') {
    mockOtpStore[email] = otp;
    console.log(`[Mock] Test OTP set for ${email}: ${otp}`);
  }
};

// Initialize some test OTPs for development
if (process.env.NODE_ENV === 'development') {
  authService.initTestOtp('test@example.com', '123456');
  authService.initTestOtp('inspector@sami.sa', '123456');
  authService.initTestOtp('admin@sami.sa', '123456');
}

export default authService;
