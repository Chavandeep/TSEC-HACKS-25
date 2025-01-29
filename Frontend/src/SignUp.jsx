import React, { useState } from 'react';
import firebase, { auth } from '../firebase';

const SignupForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
      })
      .catch((err) => {
        setError('Failed to send OTP: ' + err.message);
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);

    auth.signInWithCredential(credential)
      .then((userCredential) => {
        // OTP verification successful
        console.log('OTP Verified:', userCredential.user);
        // Proceed with registration or redirect to dashboard
      })
      .catch((err) => {
        setError('Failed to verify OTP: ' + err.message);
      });
  };

  return (
    <div className="signup-form">
      <h2>Register</h2>

      <form onSubmit={handlePhoneNumberSubmit}>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          required
        />
        <button type="submit">Send OTP</button>
      </form>

      {verificationId && (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignupForm;
