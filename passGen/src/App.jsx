import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(4);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    let str = letters;
    let pass = '';
    const forcedChars = [];

    if (numAllowed) {
      str += numbers;
      forcedChars.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }

    if (charAllowed) {
      str += symbols;
      forcedChars.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
    }

    if (length < forcedChars.length) {
      alert(`Password length must be at least ${forcedChars.length} to include selected options.`);
      setPassword('');
      return;
    }

    for (let i = 0; i < length - forcedChars.length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    pass += forcedChars.join('');
    const finalPass = pass
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    setPassword(finalPass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed]);

  const copyToClipboard = useCallback(() => {
    if (password) {
      passwordRef.current?.select();
      navigator.clipboard.writeText(password);
    }
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-6 my-12 text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-400">
        Password Generator
      </h1>

      <div className="flex items-center bg-gray-100 rounded-md overflow-hidden mb-5">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          placeholder="Password"
          className="w-full px-4 py-2 text-black text-lg bg-gray-100 outline-none"
        />
        <button
          onClick={copyToClipboard}
          disabled={!password}
          className={`px-4 py-4 text-sm font-medium transition-colors duration-200 ${
            password
              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
              : 'bg-gray-500 text-white cursor-not-allowed'
          }`}
        >
          Copy
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="length" className="block text-lg font-medium mb-2">
          Password Length: <span className="text-orange-400">{length}</span>
        </label>
        <input
          id="length"
          type="range"
          min="4"
          max="10"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeNumbers"
            checked={numAllowed}
            onChange={() => setNumAllowed(!numAllowed)}
            className="accent-orange-500 w-4 h-4"
          />
          <label htmlFor="includeNumbers" className="text-white text-sm">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeChars"
            checked={charAllowed}
            onChange={() => setCharAllowed(!charAllowed)}
            className="accent-orange-500 w-4 h-4"
          />
          <label htmlFor="includeChars" className="text-white text-sm">
            Include Special Characters
          </label>
        </div>
      </div>

      <button
        onClick={passwordGenerator}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-md transition-all duration-200"
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
