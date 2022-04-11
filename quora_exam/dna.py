def areEqual(a, b):
    if (a == b):
        return False
    if ( (a == 'A' or a == 'T') and ((b == 'A' or b == 'T')) ):
        return True
    if ( (a == 'G' or a == 'C') and ((b == 'G' or b == 'C')) ):
        return True
    return False
    
L = int(input())
dna = list(input())

max_count = 0
current_k = 0

for k in range(1, L):
    count = 0;
    i= k-1;
    j = k;
    while(i>= 0 and j <= L-1):
        if (areEqual(dna[i], dna[j])):
            count += 1
        i -= 1
        j += 1
        if (max_count <= count):
            max_count = count
            current_k = k
    
print(current_k, max_count)