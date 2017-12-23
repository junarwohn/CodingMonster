test : hello.o 
	gcc -o test hello.o 
hello.o : player.h hello.c
	gcc -c hello.c 
clean : 
	rm *.o test
