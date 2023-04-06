class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.executed = false;
  }

  search() {
    if (this.executed) {
      throw new Error("Query has already been executed");
    }
    const keyword = this.queryStr.keyword
      ? {
          address: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter(){
    const queryCopy = { ...this.queryStr };

    // Removing some field for category
    const removeFields = ["keyword","page","limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    this.query = this.query.find(queryCopy);
    return this;
}
  sort() {
    if (this.executed) {
      throw new Error("Query has already been executed");
    }
    this.query = this.query.sort({ date: "desc" });
    return this;
  }
  pagination(resultPerPage) {
    if (this.executed) {
      throw new Error("Query has already been executed");
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
