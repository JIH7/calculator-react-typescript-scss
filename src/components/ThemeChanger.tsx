interface ThemeChangerProps {
    theme: string;
    setTheme: Function;
}

function ThemeChanger({ theme, setTheme } : ThemeChangerProps) {

    const handleClick = () => {
        if (theme === 't1')
            setTheme('t2');
        else if (theme === 't2')
            setTheme('t3');
        else
            setTheme('t1');
    }

    return (
        <div className={`theme-changer`}>
            <div></div>
            <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </div>
            <h3>THEME</h3>
            <button onClick={handleClick}>
                <div></div>
            </button>
        </div>
    )
}

export default ThemeChanger
