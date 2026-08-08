from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=240):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check if pixel is white or very close to white
            if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
                # Replace with transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print("Successfully created transparent logo.")
    except Exception as e:
        print(f"Error: {e}")

remove_white_bg("Logo.png", "logo-transparent.png")
