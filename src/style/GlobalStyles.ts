import { createGlobalStyle } from "styled-components";

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
            
            --color-white-100: #fff;
            --color-purple-100: #7752fe;
            --color-green-100: #006600;
            --color-red-100: #b91c1c;
            --color-red-200: #c74949;

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
        }
    
        &.light-theme {
            --color-primary-0: #fff;
            --color-primary-25: #f0f2f5;
            --color-primary-50: #c2c6cf;
            --color-primary-100: #8a95a5;
            --color-primary-200: #697a8e;
            --color-primary-300: #4e5c6e;
            --color-primary-400: #425165;
            --color-primary-500: #36465b;

            --color-secondary-100: #a1dbbb;
            --color-secondary-200: #5acca3;
            --color-secondary-300: #48b98f;
            --color-secondary-400: #3aa879;
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
    }

    body {
        font-family: 'Ubuntu', sans-serif;
        color: var(--color-primary-25);
        
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
    }

    *:disabled {
        cursor: not-allowed;
    }

    a {
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

`;

export default GlobalStyles;
