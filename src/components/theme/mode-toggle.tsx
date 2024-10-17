import { Switch } from '@/components/ui/switch'
import { useTheme } from './theme-provider'

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        defaultChecked
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
      />
    </div>
  )
}
