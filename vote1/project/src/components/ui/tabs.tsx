import React from 'react';

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

type TabsListProps = {
  className?: string;
  children: React.ReactNode;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  return (
    <div className="w-full">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value,
            onValueChange
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  return (
    <div className={`flex space-x-2 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none
        ${value === value
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700'
        }`}
      onClick={() => {}}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value: tabValue, children }) => {
  return (
    <div className={`mt-4 ${tabValue === tabValue ? 'block' : 'hidden'}`}>
      {children}
    </div>
  );
};