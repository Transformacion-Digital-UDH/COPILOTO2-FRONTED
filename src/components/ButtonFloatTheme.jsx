import { useTheme } from '@/context/ThemeContext';
import IconMoon from '@/components/icons/IconMoon';
import IconSun from '@/components/icons/IconSun';
import './ButtonFloatTheme.css';

export default function ButtonFloatTheme() {
  const { isDark, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="btn-float-theme">
      {!isDark ? (
        <IconMoon className="icon-white" />
      ) : (
        <IconSun className="icon-blue" />
      )}
    </button>
  );
}
