
const TabPanel = ({ children, index, value }) => {
  return (
    <div>
      {
      value === index && (
        <div>
          {children}
        </div>
      )
      }
    </div>
  )
}

export default TabPanel;
