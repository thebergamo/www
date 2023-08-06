import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { Loading } from '../Icons/Loading'

interface Props {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
  Icon: ReactNode
  isLoading: boolean
  onClick?: () => void
}

export const LoadableButton: React.FC<PropsWithChildren<Props>> = ({
  type,
  Icon,
  onClick,
  isLoading,
  children,
}) => {
  return (
    <button
      type={type}
      className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 dark:bg-gray-50 py-2 px-4 font-medium text-white dark:text-zinc-400 hover:bg-gray-700 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-progress disabled:bg-indigo-300"
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="w-5 h-5">{isLoading ? <Loading /> : Icon}</span>
      </span>
      {children}
    </button>
  )
}

export const LoadableAction: React.FC<
  PropsWithChildren<Omit<Props, 'type'>>
> = ({ onClick, isLoading, Icon, children }) => {
  return (
    <button
      type="button"
      className="flex hover:text-blue-400 disabled:cursor-progress disabled:bg-indigo-300"
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="w-5 h-5 mr-2">{isLoading ? <Loading /> : Icon}</span>
      {children}
    </button>
  )
}
