// Components barrel export - Atomic Design Pattern
// https://bradfrost.com/blog/post/atomic-web-design/

// ============================================
// ATOMS - Basic building blocks
// ============================================
export { Button, Input, Text, Heading, Badge, Spinner, Icon, Link, Divider, Image } from './atoms';

// ============================================
// MOLECULES - Simple combinations of atoms
// ============================================
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormField,
  SearchBar,
  Avatar,
  Alert,
  NavItem,
  StatCard,
} from './molecules';

// ============================================
// ORGANISMS - Complex UI sections
// ============================================
export { Header, Footer, Sidebar, DataTable } from './organisms';

// ============================================
// TEMPLATES - Page layouts
// ============================================
export { MainLayout, DashboardTemplate } from './templates';

// ============================================
// Type exports
// ============================================
export type {
  // Atoms
  AtomButtonProps,
  AtomInputProps,
  AtomTextProps,
  AtomHeadingProps,
  AtomBadgeProps,
  AtomSpinnerProps,
  AtomIconProps,
  AtomLinkProps,
  AtomDividerProps,
  AtomImageProps,
} from './atoms';

export type {
  // Molecules
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  FormFieldProps,
  SearchBarProps,
  AvatarProps,
  AlertProps,
  NavItemProps,
  StatCardProps,
} from './molecules';

export type {
  // Organisms
  HeaderProps,
  FooterProps,
  FooterSection,
  FooterLink,
  SidebarProps,
  DataTableProps,
  DataTableColumn,
} from './organisms';

export type {
  // Templates
  MainLayoutProps,
  DashboardTemplateProps,
} from './templates';
