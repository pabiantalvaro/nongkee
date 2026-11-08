const fs = require("fs")

const input = JSON.parse(fs.readFileSync("code.json", "utf-8"))
const output = transform(input)

fs.writeFileSync("output.txt", output, "utf-8")


function transform(data)
{
    let output = ""

    for (const [facultyKey, majors] of Object.entries(data))
    {
        const [facultyCode, facultyName] = facultyKey.split(":").map(s => s.trim())

        output += facultyCode + " - " + facultyName + ":\n"

        const deptMap = {}

        for (const major of majors)
        {
            const deptCode = major.code.split(".")[1] ?? "00"

            if (!deptMap[deptCode])
            {
                deptMap[deptCode] = []
            }

            deptMap[deptCode].push(major)
        }

        const sortedDeptCodes = Object.keys(deptMap).sort((a, b) => Number(a) - Number(b))

        for (const deptCode of sortedDeptCodes)
        {
            output += "\t" + " - " + deptCode + ":\n"

            deptMap[deptCode].sort((a, b) =>
                a.code.localeCompare(b.code, undefined, { numeric: true })
            )

            for (const major of deptMap[deptCode])
            {
                output += "\t" + "\t" + " - " + major.name + "\n"
            }
        }

        output += "\n"
    }

    return output
}
