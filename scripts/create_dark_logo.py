from PIL import Image
import numpy as np

def create_dark_mode_logo():
    img = Image.open('d:/Jancy  builders/public/logo/jancy-official-logo.png').convert('RGBA')
    arr = np.array(img)
    
    # arr is [H, W, 4]
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    
    # Identify black/dark pixels with high alpha
    # Black roof, black pillars
    is_black = (r < 50) & (g < 50) & (b < 50) & (a > 100)
    
    # Create dark-mode version where black is converted to crisp white/platinum
    dark_mode_arr = arr.copy()
    dark_mode_arr[is_black, 0] = 255 # R
    dark_mode_arr[is_black, 1] = 255 # G
    dark_mode_arr[is_black, 2] = 255 # B
    
    dark_mode_img = Image.fromarray(dark_mode_arr)
    dark_mode_img.save('d:/Jancy  builders/public/logo/jancy-logo-darkmode.png')
    print("Dark mode logo created: jancy-logo-darkmode.png")

if __name__ == '__main__':
    create_dark_mode_logo()
