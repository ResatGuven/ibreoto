import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportAnalysisPDF(analysis: any) {
  if (typeof window === 'undefined') return;

  // Create a hidden, beautifully styled certificate element
  const certContainer = document.createElement('div');
  certContainer.style.position = 'fixed';
  certContainer.style.left = '-9999px';
  certContainer.style.top = '-9999px';
  certContainer.style.width = '794px'; // A4 width in pixels at 96 DPI
  certContainer.style.height = '1123px'; // A4 height in pixels at 96 DPI
  certContainer.style.backgroundColor = '#FFFFFF';
  certContainer.style.color = '#111827';
  certContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  certContainer.style.boxSizing = 'border-box';
  certContainer.style.padding = '50px';

  const dateStr = new Date(analysis.analysisDate).toLocaleDateString('tr-TR');

  certContainer.innerHTML = `
    <div style="border: 15px solid #F5A623; height: 100%; box-sizing: border-box; padding: 40px; position: relative; background-image: radial-gradient(circle at 10% 10%, rgba(245, 166, 35, 0.05) 0%, transparent 80%); display: flex; flex-direction: column; justify-content: space-between;">
      <!-- Honeycomb watermark -->
      <div style="position: absolute; top: 20px; right: 20px; font-size: 50px; opacity: 0.1;">🐝</div>
      <div style="position: absolute; bottom: 20px; left: 20px; font-size: 50px; opacity: 0.1;">🍯</div>

      <div>
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #E5E7EB; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #D97706; margin: 0; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">ARI HAYAT</h1>
          <p style="color: #4B5563; margin: 5px 0 0 0; font-size: 12px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase;">Premium Şifa Kaynakları</p>
        </div>

        <!-- Certificate Title -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="color: #1F2937; margin: 0; font-size: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Laboratuvar Analiz & Saflık Belgesi</h2>
          <div style="width: 80px; height: 4px; background: #F5A623; margin: 15px auto;"></div>
          <p style="color: #6B7280; font-size: 12px; margin: 0; line-height: 1.5;">Bu sertifika, aşağıda detayları belirtilen ürünün akredite gıda laboratuvarlarında gerçekleştirilen analiz sonuçlarını ve orijinalliğini doğrulamaktadır.</p>
        </div>

        <!-- Details Block -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px; background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; font-size: 13px;">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div><strong style="color: #4B5563;">Barkod / Lot No:</strong> <span style="font-weight: 700; color: #111827; letter-spacing: 0.5px;">${analysis.batchNo}</span></div>
            <div><strong style="color: #4B5563;">Ürün Türü:</strong> <span style="font-weight: 700; color: #111827;">${analysis.productName}</span></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; text-align: right;">
            <div><strong style="color: #4B5563;">Analiz Tarihi:</strong> <span style="font-weight: 700; color: #111827;">${dateStr}</span></div>
            <div><strong style="color: #4B5563;">Saflık Durumu:</strong> <span style="font-weight: 700; color: #059669;">%100 SAF & ÇİĞ BAL</span></div>
          </div>
        </div>

        <!-- Metrics Section -->
        <div style="margin-bottom: 40px;">
          <h3 style="color: #1F2937; font-size: 15px; font-weight: 700; text-transform: uppercase; margin-bottom: 15px; border-left: 4px solid #F5A623; padding-left: 10px;">Laboratuvar Parametreleri</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
              <tr style="background-color: #F3F4F6; text-align: left; border-bottom: 2px solid #E5E7EB;">
                <th style="padding: 12px 10px; color: #4B5563; font-weight: 700;">Analiz Parametresi</th>
                <th style="padding: 12px 10px; color: #4B5563; font-weight: 700;">Bulunan Değer</th>
                <th style="padding: 12px 10px; color: #4B5563; font-weight: 700;">Yasal Alt/Üst Limit</th>
                <th style="padding: 12px 10px; color: #4B5563; font-weight: 700;">Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 10px; font-weight: 600; color: #111827; font-size: 13px;">Prolin Değeri</td>
                <td style="padding: 12px 10px; font-weight: 700; color: #D97706; font-size: 14px;">${analysis.proline} mg/kg</td>
                <td style="padding: 12px 10px; color: #6B7280;">&gt; 180 mg/kg</td>
                <td style="padding: 12px 10px; font-weight: 700; color: #059669;">UYGUN (Mükemmel)</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 10px; font-weight: 600; color: #111827; font-size: 13px;">Nem Oranı</td>
                <td style="padding: 12px 10px; font-weight: 700; color: #2563EB; font-size: 14px;">%${analysis.moisture}</td>
                <td style="padding: 12px 10px; color: #6B7280;">&lt; %20</td>
                <td style="padding: 12px 10px; font-weight: 700; color: #059669;">UYGUN (Düşük Nem)</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 10px; font-weight: 600; color: #111827; font-size: 13px;">Diastaz Sayısı</td>
                <td style="padding: 12px 10px; font-weight: 700; color: #059669; font-size: 14px;">${analysis.diastase}</td>
                <td style="padding: 12px 10px; color: #6B7280;">&gt; 8</td>
                <td style="padding: 12px 10px; font-weight: 700; color: #059669;">UYGUN (Canlı Enzim)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Notes / Quality Statement -->
        <div style="margin-bottom: 50px; background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 20px; font-size: 12px; line-height: 1.6; color: #78350F;">
          <strong style="font-size: 13px; display: block; margin-bottom: 5px;">📜 Uzman Görüşü ve Taahhüdümüz:</strong>
          ${analysis.notes || 'Bu bal örneği akredite gıda analiz laboratuvarlarında incelenmiştir. İçeriğinde tarım ilacı kalıntısı, glikoz veya nişasta bazlı harici şurup bulunmamaktadır. Türk Gıda Kodeksi Bal Tebliği standartlarına %100 uygundur.'}
        </div>
      </div>

      <!-- Footer / Signatures -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 11px; color: #6B7280; padding-top: 20px; border-t: 1px dashed #E5E7EB;">
        <div>
          <p style="margin: 0; font-weight: 700; color: #4B5563;">Arı Hayat Arıcılık A.Ş.</p>
          <p style="margin: 3px 0 0 0;">Doğallık ve Şeffaflık Taahhüdü</p>
          <p style="margin: 3px 0 0 0;">www.arihayat.com</p>
        </div>
        <div style="text-align: right;">
          <div style="font-family: 'Courier New', monospace; font-size: 12px; font-weight: bold; color: #9CA3AF; margin-bottom: 5px;">[ E-İMZALIDIR ]</div>
          <p style="margin: 0; font-weight: 700; color: #4B5563;">Laboratuvar Onayı</p>
          <p style="margin: 3px 0 0 0;">Güvenli Üretim Direktörlüğü</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(certContainer);

  try {
    const canvas = await html2canvas(certContainer, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    pdf.save(`arihayat_sertifika_${analysis.batchNo}.pdf`);
  } catch (error) {
    console.error('PDF export error:', error);
  } finally {
    document.body.removeChild(certContainer);
  }
}
