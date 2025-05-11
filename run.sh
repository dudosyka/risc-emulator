java -jar Compiler.jar $1 > out.asm
node ./cli.js ./out.asm ./lib.asm