type Props = {
  children: React.ReactNode;
};

function SidebarGroup({ children }: Props) {
  return (
    <div className='mt-7 border-t border-t-gray-300 pt-7 space-y-3'>
      {children}
    </div>
  );
}

export default SidebarGroup;
