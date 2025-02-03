import Icon from '@components/atoms/Icon';
import React from 'react';

interface TabIconsProps {
  focused: boolean;
  size: number;
  color: string;
}

export const HomeIcon: React.FC<TabIconsProps> = ({focused, size, color}) => {
  return (
    <Icon
      name={focused ? 'home' : 'home-outline'}
      size={size}
      iconFamily="MaterialCommunityIcons"
      color={color}
    />
  );
};
export const CartIcon: React.FC<TabIconsProps> = ({focused, size, color}) => {
  return (
    <Icon
      name={focused ? 'cart' : 'cart-outline'}
      size={size}
      iconFamily="MaterialCommunityIcons"
      color={color}
    />
  );
};
export const AccountIcon: React.FC<TabIconsProps> = ({
  focused,
  size,
  color,
}) => {
  return (
    <Icon
      name={focused ? 'account' : 'account-outline'}
      size={size}
      iconFamily="MaterialCommunityIcons"
      color={color}
    />
  );
};
export const CategoryIcon: React.FC<TabIconsProps> = ({
  focused,
  size,
  color,
}) => {
  return (
    <Icon
      name={focused ? 'grid' : 'grid'}
      size={size}
      iconFamily="MaterialCommunityIcons"
      color={color}
    />
  );
};
