class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.executed = false;
  }

  search() {
    if (this.executed) {
      throw new Error('Query has already been executed');
    }
    const keyvalue = this.queryStr.keyvalue
      ? {
          address: {
            $regex: this.queryStr.keyvalue,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyvalue });
    return this;
  }

  filter() {
    if (this.executed) {
      throw new Error('Query has already been executed');
    }
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyvalue", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    if (this.executed) {
      throw new Error('Query has already been executed');
    }
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }

  async execute() {
    this.executed = true;
    return await this.query;
  }
}

module.exports = ApiFeatures;
