import React, { useState, useEffect } from 'react';

const PasswordInstructions = () => {
  return (
    <div className="text-xs text-gray-700">
      <p className="mb-1">
        To create a strong password:
      </p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Length:</strong> At least 8 characters long.
        </li>
        <li>
          <strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, and special characters.
        </li>
        <li>
          <strong>Unpredictability:</strong> Avoid common patterns or easily guessable words.
        </li>
      </ul>
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = useState('weak');
  const [meterColor, setMeterColor] = useState('bg-red-500');

  const calculateStrength = (password) => {
    let score = 0;

    if (!password || password.length < 8) {
      setStrength('weak');
      setMeterColor('bg-red-500');
      return;
    }

    // Add points for length
    score += password.length;

    // Add points for uppercase letters
    if (/[A-Z]/.test(password)) {
      score += 3;
    }

    // Add points for lowercase letters
    if (/[a-z]/.test(password)) {
      score += 1;
    }

    // Add points for numbers
    if (/\d/.test(password)) {
      score += 1;
    }

    // Add points for special characters
    if (/[@$!%*?&]/.test(password)) {
      score += 3;
    }

    // Determine strength level based on score
    if(score === 0){
      setStrength('');
      setMeterColor('bg-gray-200');
    }
    else if (score < 6) {
      setStrength('weak');
      setMeterColor('bg-red-500');
    } else if (score < 18) {
      setStrength('moderate');
      setMeterColor('bg-yellow-500');
    } else {
      setStrength('strong');
      setMeterColor('bg-green-500');
    }
  };

  // Calculate strength on password change
  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  return (
    <div>
      <PasswordInstructions />
      <p className="mt-4">Password Strength: {strength}</p>
      <div className="h-2 bg-gray-200 mt-1">
        <div
          className={`h-full ${meterColor}`}
          style={{ width: strength === 'weak' ? '33%' : strength === 'moderate' ? '66%' : '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;
