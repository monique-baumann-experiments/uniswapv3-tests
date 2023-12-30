import { ethers, Logger } from '../deps.ts';

export class Helper {

    public static getProviderURL(logger: Logger): string {
        let configuration: any = {}
        if (Deno.args[0] !== undefined) { // supplying your provider URL via parameter
            return Deno.args[0]
        } else { // ... or via .env.json
            try {
                configuration = JSON.parse(Deno.readTextFileSync('./.env.json'))
                return configuration.providerURL
            } catch (error) {
                logger.error(error.message)
                logger.error("without a providerURL I cannot connect to the blockchain")
            }
        }
        throw new Error("could not get a providerURL")
    }

    public static async getLogger(): Promise<Logger> {
        const minLevelForConsole = 'DEBUG'
        const minLevelForFile = 'WARNING'
        const fileName = "./warnings-errors.txt"
        const pureInfo = true // leaving out e.g. the time info
        return Logger.getInstance(minLevelForConsole, minLevelForFile, fileName, pureInfo)
    }
}

