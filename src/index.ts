#!/usr/bin/env ts-node

import { createProgram } from './cli';

const program = createProgram();
program.parse(process.argv);
