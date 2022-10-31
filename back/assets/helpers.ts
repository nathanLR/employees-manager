import fs from "fs";

export const guid = (): string => {
  const s4 = (): string => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + "-" + s4() + "-" + s4();
};

export const writeToFile = (filename: string, data: object): void => {
  fs.writeFileSync(filename, JSON.stringify(data), "utf-8");
};

export const getRequestData = (req): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => (body += chunk.toString()));
      req.on("end", () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
};
