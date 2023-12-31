import { createGlobalStyle } from "styled-components";

import { themes } from "../data/themes";

const generateThemesVariables = () => {
	let css = "";

	themes.forEach((theme) => {
		const variableEntries = Object.entries(theme.variables);
		css += `
          ${variableEntries.map(([property, value]) => `${property}: ${value};`).join("\n")}
        `;
	});

	return css;
};

const GlobalStyles = createGlobalStyle`
    :root {
        &, &.dark-theme {
            --color-primary-0: #fff;
            --color-primary-25: #d3d5d8;
            --color-primary-50: #91969f;
            --color-primary-100: #4e5665;
            --color-primary-200: #384252;
            --color-primary-300: #232d3f;
            --color-primary-400: #1f2838;
            --color-primary-500: #1c2432;

            --color-secondary-100: #196b54;
            --color-secondary-200: #005b41;
            --color-secondary-300: #00513a;
            --color-secondary-400: #004834;
            
            --font-color: #d3d5d8;

            --color-white-100: #fff;
            --color-black-100: #000;
            --color-purple-100: #7752fe;
            --color-green-100: #006600;
            --color-green-200: #338533;
            --color-red-100: #b91c1c;
            --color-red-200: #c74949;

            --logo-color: #f79230;

            --font-weight-light: 300;
            --font-weight-regular: 400;
            --font-weight-medium: 500;
            --font-weight-bold: 700;

            --backdrop-color: rgba(255, 255, 255, 0.1);

            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
            --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
            
            --border-thin: 1px solid var(--color-primary-200);
            --border-normal: 2px solid var(--color-primary-200); 

            --border-radius-xsm: 5px;
            --border-radius-sm: 10px;
            --border-radius-md: 20px;
            --border-radius-circle: 50%;

            --padding-xsm: 0.5rem;
            --padding-sm: 1rem;
            --padding-md: 2rem;
            --padding-lg: 3rem;
            --padding-xlg: 4rem;

            --image-grayscale: 0;
            --image-opacity: 100%;

            --transition-all-3: 0.3s all;
            --transition-all-5: 0.5s all;

            /* Chat Themes */
            ${generateThemesVariables()}
        }
    
        &.light-theme {
            --color-primary-0: #606162;
            --color-primary-25: #78797b;
            --color-primary-50: #909193;
            --color-primary-100: #a8a9ac;
            --color-primary-200: #c0c2c4;
            --color-primary-300: #d8dadd;
            --color-primary-400: #f0f2f5; 
            --color-primary-500: #fff;

            --color-secondary-100: #a1dbbb;
            --color-secondary-200: #5acca3;
            --color-secondary-300: #48b98f;
            --color-secondary-400: #3aa879;

            --font-color: #000;

            --toaster-font-color: #000;
        }
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        
        scrollbar-width: thin;
	    scrollbar-color: var(--color-secondary-400) transparent;
    }

    html {
        font-size: 62.5%;
        background-color: grey;

        @media only screen and (width <= 1360px){
            font-size: 56.5%;
        }

        @media only screen and (width <= 860px){
            font-size: 52%;
        }

        @media only screen and (width <= 480px){
            font-size: 48%;
        }
    }

    body {
        font-family: 'Ubuntu', sans-serif;
        color: var(--font-color);
        
        transition: color 0.3s, background-color 0.3s;
        min-height: 100vh;
        line-height: 1.5;
        font-size: 1.6rem;
    }
    
    input,
    button,
    textarea,
    select {
        font: inherit;
        color: inherit;
        border: none;

        &:focus {
            outline: solid 1px var(--color-secondary-400);
        }
    }

    button {
        cursor: pointer;
        
        &,
        &:active,
        &:focus {
            outline: none;
        } 
    }

    *:disabled {
        cursor: not-allowed;
    }

    a,
    a:link,
    a:visited {
        color: var(--font-color);
        text-decoration: none;
        cursor: pointer;
    }

    ul {
        list-style: none;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }

    img {
        max-width: 100%;
    }

    aside.EmojiPickerReact {
        --epr-dark-category-icon-active-color: var(--color-secondary-100);

        &.epr-dark-theme {
            border: none;
            --epr-bg-color: transparent;
            --epr-category-label-bg-color: var(--color-primary-400);
            --epr-search-input-bg-color: var(--color-primary-500);
            --epr-search-input-bg-color-active: var(--color-primary-500);
            --epr-search-border-color: var(--color-secondary-100);
            --epr-picker-border-color: transparent;
            --epr-text-color: var(--font-color);
        }
    }
`;

export default GlobalStyles;
