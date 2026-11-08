const fs = require("fs")

const input = JSON.parse(fs.readFileSync("code.json", "utf-8"))
const output = transform(input)

fs.writeFileSync("output.json", JSON.stringify(output, null, 4))

/*
 * {
 *     "<faculty_code>.01": {
 *         "name": "<faculty_name>",
 *         "<department_code>": Array<{ 
 *             "code": "<major_code>.<departement_code>.<faculty_code>.01", 
 *             "name": "<major_name>" 
 *         }>
 *     }
 * }
 */ 
function transform(data)
{
    const result = {}

    for (const [facultyKey, majors] of Object.entries(data))
    {
        const [facultyCode, facultyName] = facultyKey.split(":").map(s => s.trim())

        const facultyObj = {
            name: facultyName
        }

        const deptMap = {}

        for (const major of majors)
        {
            const deptCode = major.code.split(".")[1] ?? "00"

            if (!deptMap[deptCode])
            {
                deptMap[deptCode] = []
            }

            deptMap[deptCode].push({
                code: major.code,
                name: major.name
            })
        }

        const sortedDeptCodes = Object.keys(deptMap).sort((a, b) => Number(a) - Number(b))

        for (const deptCode of sortedDeptCodes)
        {
            deptMap[deptCode].sort((a, b) =>
            {
                return a.code.localeCompare(b.code, undefined, { numeric: true })
            })

            facultyObj[deptCode] = deptMap[deptCode]
        }

        result[facultyCode] = facultyObj
    }

    return result
}
