# Generate example img code for APRS
import numpy as np
from PIL import Image

filename = "test_img.jpg"
img = Image.open(filename)
imgarray =  np.asarray(img)
imgvec_raw = np.reshape(imgarray[:,:,0], -1,order='F') # take just the R value, negate G,B
tx_img = Image.fromarray(imgvec_raw.reshape((256,256),order='F'),mode='L')
tx_img.show()
print(min(imgvec_raw), " , ", max(imgvec_raw))
#print(np.shape(imgvec))
# imgvec = imgvec[0]
imgvec = np.round(np.interp(imgvec_raw, (imgvec_raw.min(), imgvec_raw.max()), (33, 126)))

# redo with printable ascii characters only (image compression?)
imgvec_int = [int(n) for n in imgvec]
imgvec_ascii = [chr(n) for n in imgvec_int]
rx_imgvec = [ord(n) for n in imgvec_ascii]
rx_imgvec = np.asarray(imgvec_raw)
rx_imgvec = np.interp(rx_imgvec, (rx_imgvec.min(), rx_imgvec.max()), (0, 255))

rx_array = np.reshape(imgvec_raw,np.shape(imgarray[:,:,0]),order='F')
rx_img = Image.fromarray(rx_array, mode='L')
rx_img.save('test_img_rx.jpg')
rx_img.show()

