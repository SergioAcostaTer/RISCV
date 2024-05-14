"use client"
import { useRef, useState } from "react";

export const resgisterNames = {
    "x0": 0,
    "ra": 1,
    "sp": 2,
    "gp": 3,
    "tp": 4,
    "t0": 5,
    "t1": 6,
    "t2": 7,
    "s0": 8,
    "s1": 9,
    "a0": 10,
    "a1": 11,
    "a2": 12,
    "a3": 13,
    "a4": 14,
    "a5": 15,
    "a6": 16,
    "a7": 17,
    "s2": 18,
    "s3": 19,
    "s4": 20,
    "s5": 21,
    "s6": 22,
    "s7": 23,
    "s8": 24,
    "s9": 25,
    "s10": 26,
    "s11": 27,
    "t3": 28,
    "t4": 29,
    "t5": 30,
    "t6": 31,
};

export const registerNamesList = [
    "x0",
    "ra",
    "sp",
    "gp",
    "tp",
    "t0",
    "t1",
    "t2",
    "s0",
    "s1",
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "s2",
    "s3",
    "s4",
    "s5",
    "s6",
    "s7",
    "s8",
    "s9",
    "s10",
    "s11",
    "t3",
    "t4",
    "t5",
    "t6",
];


const useRiscV = () => {
    const textAreaRef = useRef(null);
    const [register, setRegister] = useState(Array(32).fill(0));

    const reset = () => {
        setRegister(Array(32).fill(0));
    }

    const executeRISCV = () => {
        let text = textAreaRef.current.value.replace(/#.*/g, "").replace(/\n+/g, "\n").trim();
        console.log(text);
        const lines = text.split("\n");
        let pc = 0;
        let memory = Array(1024).fill(0);
        let registers = Array(32).fill(0);
        let instructions = [];
        let labels = {};

        // Handle data directives
        const dataSegment = [];
        const parseDataDirective = (line) => {
            const [directive, ...args] = line.trim().split(/\s+/);
            switch (directive) {
                case '.align':
                    const alignment = parseInt(args[0]);
                    while (dataSegment.length % alignment !== 0) {
                        dataSegment.push(0);
                    }
                    break;
                case '.ascii':
                case '.asciz':
                    const asciiString = args.join(' ').replace(/"/g, '');
                    for (let i = 0; i < asciiString.length; i++) {
                        dataSegment.push(asciiString.charCodeAt(i));
                    }
                    if (directive === '.asciz') {
                        dataSegment.push(0); // Null terminator for .asciz
                    }
                    break;
                case '.byte':
                    args.forEach(arg => dataSegment.push(parseInt(arg)));
                    break;
                case '.dword':
                    args.forEach(arg => {
                        const dword = BigInt(arg);
                        dataSegment.push(Number(dword & 0xFFFFFFFFn));
                        dataSegment.push(Number((dword >> 32n) & 0xFFFFFFFFn));
                    });
                    break;
                case '.half':
                    args.forEach(arg => dataSegment.push(parseInt(arg) & 0xFFFF));
                    break;
                case '.space':
                    const spaceSize = parseInt(args[0]);
                    for (let i = 0; i < spaceSize; i++) {
                        dataSegment.push(0);
                    }
                    break;
                case '.string':
                    const string = args.join(' ').replace(/"/g, '');
                    for (let i = 0; i < string.length; i++) {
                        dataSegment.push(string.charCodeAt(i));
                    }
                    dataSegment.push(0); // Null terminator for .string
                    break;
                case '.word':
                    args.forEach(arg => dataSegment.push(parseInt(arg)));
                    break;
                default:
                    break;
            }
        };

        lines.forEach((line, index) => {
            if (line.startsWith(".")) {
                parseDataDirective(line);
                return;
            }
            const [instruction, ...args] = line.trim().replace(/,/g, "").split(" ");
            if (instruction.endsWith(":")) {
                labels[instruction.slice(0, -1)] = index;
                return;
            }
            if (instruction === "") {
                return;
            }
            instructions.push({ instruction, args });
        });

        console.log('Data Segment:', dataSegment);
        console.log('Instructions:', instructions);

        // Load data segment into memory
        for (let i = 0; i < dataSegment.length; i++) {
            memory[i] = dataSegment[i];
        }

        console.log('Memory:', memory);

        while (pc < instructions.length) {
            const { instruction, args } = instructions[pc];

            console.log(instruction, args, pc);

            if (pc > 1000) {
                break;
            }

            const newArgs = args.map((arg) => {
                if (arg === "") {
                    return;
                }
                if (arg in labels) {
                    return labels[arg];
                }
                if (arg in resgisterNames) {
                    return resgisterNames[arg];
                }
                if (arg.endsWith(")")) {
                    const [offset, base] = arg.split("(");
                    const offsetValue = parseInt(offset);
                    const baseValue = base.slice(0, -1);
                    return registers[resgisterNames[baseValue]] + offsetValue;
                }
                return parseInt(arg);
            });

            const [f, s, t] = newArgs;

            switch (instruction) {
                case "add":
                    registers[f] = registers[s] + registers[t];
                    break;
                case "sub":
                    registers[f] = registers[s] - registers[t];
                    break;
                case "mul":
                    registers[f] = registers[s] * registers[t];
                    break;
                case "div":
                    registers[f] = registers[s] / registers[t];
                    break;
                case "addi":
                    registers[f] = registers[s] + t;
                    break;
                case "subi":
                    registers[f] = registers[s] - t;
                    break;
                case "muli":
                    registers[f] = registers[s] * t;
                    break;
                case "divi":
                    registers[f] = registers[s] / t;
                    break;
                case "lw":
                    registers[f] = memory[s];
                    break;
                case "lb":
                    registers[f] = memory[s];
                    break;
                case "la":
                    registers[f] = s;
                    break;
                case "li":
                    registers[f] = s;
                    break;
                case "sw":
                    memory[s] = registers[f];
                    break;
                case "beq":
                    if (registers[f] === registers[s]) {
                        pc = t - 1;
                    }
                    break;
                case "bne":
                    if (registers[f] !== registers[s]) {
                        pc = t - 1;
                    }
                    break;
                case "blt":
                    if (registers[f] < registers[s]) {
                        pc = t - 1;
                    }
                    break;
                case "bgt":
                    if (registers[f] > registers[s]) {
                        pc = t - 1;
                    }
                    break;
                case "bge":
                    if (registers[f] >= registers[s]) {
                        pc = t - 1;
                    }
                    break;
                case "ble":
                    if (registers[f] <= registers[s]) {
                        pc = t - 1;
                    }
                    break;
                case "jal":
                    registers[1] = pc;
                    pc = registers[f];
                    break;
                case "jalr":
                    registers[1] = pc;
                    pc = registers[f];
                    break;
                case "ret":
                    pc = registers[1];
                    break;
                case "end":
                    break;
            }
            pc++;
        }
        setRegister(registers);
    };

    return { textAreaRef, register, executeRISCV, resgisterNames, reset };
};

export default useRiscV;
