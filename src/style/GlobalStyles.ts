import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        &, &.dark-mode {
            --color-primary-0: #d3d5d8;
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

            --color-purple-100: #7752FE;

            --color-red-100: #b91c1c;

            --backdrop-color: rgba(255, 255, 255, 0.1);

            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
            --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
            

            --image-grayscale: 0;
            --image-opacity: 100%;
        }
    
        &.light-mode {
        }
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: "Poppins", sans-serif;
        color: var(--color-grey-700);

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
    }

    button {
        cursor: pointer;
    }

    *:disabled {
        cursor: not-allowed;
    }

    a {
        color: inherit;
        text-decoration: none;
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
