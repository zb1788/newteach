package vcom.mobile;


public class Common {

    public static int getrandom(int num) {
        int[] array = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        java.util.Random rand = new java.util.Random();
        for (int i = 10; i > 1; i--) {
            int index = rand.nextInt(i);
            int tmp = array[index];
            array[index] = array[i - 1];
            array[i - 1] = tmp;
        }
        int result = 0;
        for (int i = 0; i < num; i++)
            result = result * 10 + array[i];
        return result;

    }

}
