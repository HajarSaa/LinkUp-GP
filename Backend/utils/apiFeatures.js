// This class transforms simple query parameters into sophisticated MongoDB queries
// Each method returns 'this' to enable elegant method chaining
class APIFeatures {
  // - query: A Mongoose query object
  // - queryString: The raw query parameters from the request (req.query)
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // filter(): Implements advanced filtering with MongoDB operators
  // Handles advanced filtering with operators like gte, gt, lte, lt
  filter() {
    // Create a fresh copy of query parameters to avoid modifying the original
    const queryObj = { ...this.queryString };

    // Define fields that should be excluded from direct filtering
    // These are special parameters used for other query features
    const exlecudedFields = ["page", "sort", "limit", "fields"];

    // Remove these special fields from our filter object
    exlecudedFields.forEach((field) => delete queryObj[field]);

    // ADVANCED FILTERING MAGIC! 🔮
    // Convert the query object to a string for regex manipulation
    let queryStr = JSON.stringify(queryObj);

    // regex transformation that prepends MongoDB operators with $
    // Converts patterns like gte into $gte
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Apply our perfectly formatted filters to the Mongoose query
    this.query = this.query.find(JSON.parse(queryStr));

    // Return this instance to enable elegant method chaining
    return this;
  }

  // sort(): Gives structure to our results by ordering them
  // Supports multi-field sorting through comma-separated values
  sort() {
    if (this.queryString.sort) {
      // Transform comma-separated sort fields into space-separated format for Mongoose
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // Default sorting by creation date (newest first) if no sort parameter provided
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // limitFields(): Efficiently selects only the fields we need
  limitFields() {
    if (this.queryString.fields) {
      // Transform comma-separated fields into space-separated format
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      // By default, exclude the Mongoose internal field __v from results
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // paginate(): Implements pagination support
  paginate() {
    // Extract page number from query string 
    // Multiplication by 1 converts string parameters to numbers
    const page = this.queryString.page * 1 || 1;

    // Extract limit from query string
    const limit = this.queryString.limit * 1 || 100;

    // Calculate number of documents to skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit to the query 
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
