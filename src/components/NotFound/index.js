import './index.css'

const NotFound = () => (
  <div className="bg-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/djifdyfkd/image/upload/v1711792937/Group_7504_2x_swybly.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
