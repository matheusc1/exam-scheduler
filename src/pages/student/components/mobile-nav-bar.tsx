import { NavLink } from 'react-router-dom'

export function MobileNavBar() {
  return (
    <div className="space-y-1 px-2 pt-2">
      <NavLink
        to="/"
        className="block rounded-md px-3 py-2 text-sm font-medium aria-[current=page]:bg-secondary hover:bg-secondary"
      >
        Agendar avaliação
      </NavLink>

      <NavLink
        to="/support"
        className="block rounded-md px-3 py-2 text-sm font-medium aria-[current=page]:bg-secondary hover:bg-secondary"
      >
        Suporte
      </NavLink>
    </div>
  )
}
