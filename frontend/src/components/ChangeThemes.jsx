import React from 'react';

const ChangeThemes = () => {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  React.useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="fixed w-full flex justify-end pt-5 pr-5">
      <label className="cursor-pointer grid place-items-center">
        <input
          onClick={toggleTheme}
          type="checkbox"
          //   value="synthwave"
          className="toggle theme-controller bg-base-content border-base-content [--tglbg:#fbfbfb] checked:[--tglbg:#1a1a21] row-start-1 col-start-1 col-span-2"
        />
        <svg
          className="col-start-1 row-start-1 stroke-base-200 fill-base-200"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="col-start-2 row-start-1 stroke-base-200 fill-base-200"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  );
};

export default ChangeThemes;
