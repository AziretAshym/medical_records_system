import { Typography, Divider, Box } from '@mui/material';

const GeneralOverview = () => {
  return (
    <Box sx={{ px: 2, py: 1, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Общее описание системы управления данными пациентов
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Система представляет собой веб-приложение, разработанное в рамках выпускной квалификационной работы (ВКР), предназначенное
        для автоматизации процессов в медицинских учреждениях. Основная цель — упростить и систематизировать работу с данными о пациентах.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" fontWeight={600} gutterBottom>
        Назначение системы
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Система предназначена для хранения и управления информацией о пациентах, их приёмах, назначениях и медицинской истории.
        Она помогает медицинскому персоналу быстро получать доступ к необходимой информации и вести учет всех взаимодействий с пациентами.
      </Typography>

      <Typography variant="h6" fontWeight={600} gutterBottom>
        Ключевые модули
      </Typography>
      <Typography component="ul" variant="body2" color="text.secondary" sx={{ pl: 2 }}>
        <li>Управление данными пациентов</li>
        <li>Медицинские записи: жалобы, диагнозы, заключения</li>
        <li>Назначения: процедуры, препараты и другие назначения</li>
        <li>История посещений и наблюдений</li>
        <li>Архивация неактуальных данных</li>
        <li>Система ролей: доступ только для авторизованных пользователей</li>
      </Typography>

      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
        Преимущества использования
      </Typography>
      <Typography component="ul" variant="body2" color="text.secondary" sx={{ pl: 2 }}>
        <li>Удобный и интуитивный интерфейс</li>
        <li>Быстрый доступ к данным из любого места</li>
        <li>Фильтрация и поиск по всем ключевым полям</li>
        <li>Сокращение времени на документооборот</li>
        <li>Безопасность и контроль доступа</li>
      </Typography>
    </Box>
  );
};

export default GeneralOverview;
