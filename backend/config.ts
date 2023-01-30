class Config {
    public port = 3000;
    public mySqlHost = "mysql";
    public mySqlUser =  "root";
    public mySqlPassword =  "12345678";
    public mySqlName = "vacation";
}

const config = new Config();
export default config;